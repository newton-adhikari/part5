import "./Notification.css";

const Notification = ({message}) => {
    const {text, error} = message;
    const cls = error ? "error" : "success" ;
    
    return (
        <p className={cls}>{text.error}</p>
    )
}

export default Notification;