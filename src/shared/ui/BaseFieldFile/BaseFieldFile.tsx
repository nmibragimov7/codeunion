import {FC, useEffect, useRef, useState} from 'react';
import {notification} from "antd";

import {classNames} from "@/shared/lib/classNames";
import upload from "@/shared/assets/svg/upload.svg";
import fileIcon from "@/shared/assets/svg/file.svg";
import deleteIcon from "@/shared/assets/svg/delete.svg";

const DEFAULT_SIZE = 100000000; // ~100mb
const DEFAULT_ACCEPT = ".png, .jpeg, .jpg, .bmp"; // file formats

interface IBaseFieldFile {
    name: string;
    size?: number;
    accept?: string;
    className?: string;
    onTake: (file: string) => void;
}

const BaseFieldFile: FC<IBaseFieldFile> = ({
                           name,
                           size = DEFAULT_SIZE,
                           accept = DEFAULT_ACCEPT,
                           className,
                           onTake}) => {
    const [file, setFile] = useState<File | null>(null);
    const fileRef = useRef<any>(null);
    const takeHandler = () => {
        const data = fileRef?.current?.files[0];
        if (data) {
            if (data.size > size) {
                notification.error({
                    message: `Файл должен весить более ${Math.round(size / 1000000)} мб!`,
                });
                return;
            }
            setFile(data);
        }
    }
    const onDisplayHandler = (data: File) => {
        const reader = new FileReader();
        reader.onload = function(event: any) {
            const url = event.target.result;
            onDisplay(url);
        };
        reader.readAsDataURL(data);
    }
    const onRemove = () => {
        setFile(null);
        onTake("");
        fileRef.current.value = null;
    }
    const onDisplay = (url: string) => {
        onTake(url);
    }
    useEffect(() => {
        if (file) {
            onDisplayHandler(file)
        }
    }, [file]);
    return (
        <>
            <div className={classNames("w-full flex justify-center bg-gray-100 cursor-pointer", className || "")}>
                <label htmlFor={name} className={"block w-full"}>
                    {!file ?
                        (
                            <div className={"flex flex-col items-center justify-center cursor-pointer p-6"}>
                                <div className={"flex items-center justify-center"}>
                                    <img src={upload} alt="upload" className={"mb-1"}/>
                                </div>
                                <div className={"text-gray-500 text-sm"}>Нажмите, чтобы загрузить</div>
                            </div>
                        ) : null}
                    <input
                        id={name}
                        ref={fileRef}
                        type="file"
                        hidden
                        accept={accept}
                        className={"!hidden"}
                        onChange={takeHandler}
                    />
                </label>
            </div>
            {file ? (
                <div className={"flex items-center justify-between border border-solid border-gray-500 py-2 px-4"}>
                    <div className={"flex items-center gap-4"}>
                        <img src={fileIcon} alt="file"/>
                        <p>{file?.name}</p>
                    </div>
                    <img
                        src={deleteIcon}
                        alt="delete"
                        className={"cursor-pointer hover:opacity-60 p-2"}
                        onClick={onRemove}
                    />
                </div>
            ) : null}
        </>
    );
};

export default BaseFieldFile;
