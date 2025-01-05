import MessageStubData from '../UserMessageTypes'
import {Link} from "react-router-dom";
const messageStubComponent: React.FC<MessageStubData> = (props) =>{
    return(
        <div className="MessageStub">
            <h5 className="StubHeader">
                <Link to={"/public-forum/" + props._id}>{props.IsQuestion? ("Question at ") : ("Response at ") + (new Date(props.Date_Created)).toLocaleString()}</Link>
            </h5>
            <h5 className="StubLikes">
                Likes: {props.Likes}, Dislikes: {props.Dislikes}
            </h5>
            <p className="StubText">
                {props.Text}
            </p>
        </div>)
}
export default messageStubComponent;