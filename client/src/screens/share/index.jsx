import "./styles.scss";
import Wrapper from "../contributions/components/wrapper";
import SectionShare from "./components/SectionShare";
import CopyToClipboard from "react-copy-to-clipboard";
import "./styles.scss";
import { toast } from "react-toastify";
const Share = (props) => {
    const copyHandler = () => {
        toast.success("Link Copied to Clipboard");
    };
    return (
        <SectionShare>
            <Wrapper>
                <div className="share-heading">Share the Link</div>
                <div className="encloser">
                    <input
                        type="text"
                        value={props.link}
                        className="shareinput"
                        readOnly={"readonly"}
                    />{" "}
                    <CopyToClipboard text={props.link}>
                        <section className="clip" onClick={copyHandler}></section>
                    </CopyToClipboard>
                </div>
                <div className="bottom-banner">BOTTOM BANNER</div>
            </Wrapper>
        </SectionShare>
    );
};
export default Share;
