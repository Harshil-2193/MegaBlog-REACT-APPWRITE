import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";

export default function RTE({
  name = "content",
  control,
  label,
  defaultValue = "",
}) {
  return (
    <div className="w-full">
      {label && (
        <label className="inline-block mb-2 text-sm font-medium text-gray-700 pl-1">
          {label}
        </label>
      )}

      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { onChange, value } }) => (
          <Editor
            value={value}
            onEditorChange={onChange}
            init={{
              branding: false,
              height: 500,
              menubar: true,
              plugins: [
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "print",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "paste",
                "help",
                "wordcount",
              ],
              toolbar: `undo redo | formatselect | bold italic underline forecolor backcolor | 
                 alignleft aligncenter alignright alignjustify | 
                 bullist numlist outdent indent | removeformat | code | fullscreen | help`,
              content_style: `
                body { font-family: 'Inter', 'Helvetica', 'Arial', sans-serif; font-size: 14px; }
                img { max-width: 100%; height: auto; }
              `,
              placeholder: "Start typing your content here...",
            }}
          />
        )}
      />
    </div>
  );
}
