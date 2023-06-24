import {FC} from "react";

interface ITag {
    text: string;
}
const Tag: FC<ITag> = ({text}) => {
    return (
        <>
            <div className={"text-gray-500 border border-solid border-gray-500 rounded-[10px] py-1 px-4"}>{text}</div>
        </>
    );
};

export default Tag;
