import {Link} from "react-router-dom";
import {SearchResultData} from "../../../MessageTypes";

const ResultStubComponent: React.FC<SearchResultData> = (props) =>{
    return(
        <div className="ResultStub">
            <h5 className="ResultHeader">
                <Link to={"/user/" + props.Account + "/profile"}>{props.Username + ":    "}</Link><Link to={"/public-forum/" + props._id}>{"Question at " + (new Date(props.Date_Created)).toLocaleString()}</Link>)
            </h5>
            <h6 className="StubLikes">
                Likes: {props.Likes}, Dislikes: {props.Dislikes}
            </h6>
            <p className="ResultText">
                {props.Text}
            </p>
        </div>)
}
export default ResultStubComponent;