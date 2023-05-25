import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "ckeditor-tailwind-reset/ckeditor-tailwind-reset.css";

const Editor = ({ data, setData, ...props }) => {
    return (
        <div className="text-black">
            <CKEditor
                editor={ClassicEditor}
                data={data}
                onChange={(_, editor) => {
                    setData("body", editor.getData());
                }}
                {...props}
            />
        </div>
    );
};

export default Editor;
