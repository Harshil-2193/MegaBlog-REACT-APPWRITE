import React, { useCallback, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select, RTE } from "../index";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { debounce } from "lodash";

const PostForm = ({ post }) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.slug || "",
      content: post?.content || "",
      status: post?.status || "active",
    },
  });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const isSlugEditedRef = useRef(false);

  const submit = async (data) => {
    if (post) {
      const file = data.image[0]
        ? await appwriteService.uploadFile(data.image[0])
        : null;

      if (file) {
        await appwriteService.deleteFile(post.featuredImage);
      }

      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });
      if (dbPost) navigate(`/post/${dbPost.$id}`);
    } else {
      const file = await appwriteService.uploadFile(
        data.image[0] ? data.image[0] : undefined
      );

      if (file) {
        data.featuredImage = file.$id;
        const dbPost = await appwriteService.createPost({
          ...data,
          userId: userData.$id,
        });

        if (dbPost) navigate(`/post/${dbPost.$id}`);
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      const slug = value.trim().toLowerCase().replace(/ /g, "_");
      return slug;
    }
    return "";
  });

  const debouncedSetSlug = useCallback(
    debounce((title) => {
      if (!isSlugEditedRef.current) {
        setValue("slug", slugTransform(title), { shouldValidate: true });
      }
    }, 300),
    [setValue, slugTransform]
  );

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        debouncedSetSlug(value.title);
      }
    });

    return () => {
      subscription.unsubscribe();
      debouncedSetSlug.cancel();
    };
  }, [watch, debouncedSetSlug]);

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="flex flex-wrap gap-6 bg-white p-8 rounded-xl shadow-xl border border-gray-200"
    >
      {/* Left Section */}
      <div className="w-full lg:w-2/3 flex flex-col gap-5">
        <Input
          label="Title"
          placeholder="Enter Post Title"
          className="text-black"
          {...register("title", { required: "Title is required." })}
        />
        {errors.title && (
          <p className="text-red-500 text-sm">{errors.title.message}</p>
        )}

        <Input
          label="Slug"
          placeholder="Slug"
          className="text-black"
          {...register("slug", { required: "Slug is required." })}
          onChange={(e) => {
            isSlugEditedRef.current = true;
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        {errors.slug && (
          <p className="text-red-500 text-sm">{errors.slug.message}</p>
        )}

        <RTE
          label="Content"
          name="content"
          control={control}
          defaultValue={getValues("content") || ""}
        />
      </div>

      {/* Right Section */}
      <div className="w-full lg:w-1/3 flex flex-col gap-5">
        <Input
          label="Featured Image"
          type="file"
          className="text-black"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        {errors.image && (
          <p className="text-red-500 text-sm">Featured Image is required.</p>
        )}

        {post && (
          <div className="w-full">
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-lg border border-gray-300"
            />
          </div>
        )}

        <Select
          options={["active", "inactive"]}
          label="Status"
          {...register("status", { required: true })}
        />
        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full py-3"
          disabled={isSubmitting}
        >
          {isSubmitting
            ? post
              ? "Updating..."
              : "Submitting..."
            : post
            ? "Update"
            : "Submit"}
        </Button>
      </div>
    </form>
  );
};

export default PostForm;
