import { Editor } from "@tinymce/tinymce-react"
import { Controller } from "react-hook-form"



export default function RTE({
    name,
    control,
    // this control is passing whole data to child element
    label,
    defaultValue = ""
}) {


    return (
        <div className="">
            {label && <label className="font-semibold text-primary-dark text-sm lg:text-md">{label}</label>}
            <Controller
                name={name}
                control={control}
                render={({ field: { onChange } }) => (
                    <Editor
                        initialValue= {defaultValue}
                        apiKey="mf0nfr3jhwzhfzy8h8owf3b1sd6fv3y2s5m5q0p9xk925rl1"
                        init={
                            {
                                branding: false,
                                height: 250,
                                menubar: true,
                                plugins: [
                                    ''
                                ],
                                toolbar: ''
                            }
                        }
                        onEditorChange={onChange}
                    />
                )}
            />
        </div>
    )
}
