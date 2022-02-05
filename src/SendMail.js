import React from "react";
import "./SendMail.css";
import CloseIcon from "@material-ui/icons/Close";
import { Button } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { closeSendMessage } from "./features/mailSlice";
import firebase from "firebase";
import { db } from "./firebase";
function SendMail() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const onSubmit = (formData) => {
    console.log(formData);
    db.collection("emails").add({
      to: formData.to,
      subject: formData.subject,
      message: formData.message,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    dispatch(closeSendMessage());
  };
  return (
    <div className="sendMail">
      <div className="sendMail__header">
        <h3>New Message</h3>
        <CloseIcon
          onClick={() => dispatch(closeSendMessage())}
          className="sendMail__close"
        />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          name="to"
          placeholder="TO"
          type="email"
          {...register("to", { required: true })}
        />
        {errors.to?.type === "required" && (
          <p className="sendMail__error">To is required</p>
        )}
        <input
          name="subject"
          placeholder="Subject"
          type="text"
          {...register("subject", { required: true })}
        />
        {errors.subject?.type === "required" && (
          <p className="sendMail__error">Subject is required</p>
        )}

        <input
          name="message"
          placeholder="Message.."
          type="text"
          className="sendMail__message"
          {...register("message", { required: true })}
        />
        {errors.message?.type === "required" && (
          <p className="sendMail__error">message is required</p>
        )}
        <div className="sendMail__options">
          <Button
            className="sendMail__send"
            variant="contained"
            color="primary"
            type="submit"
          >
            Send
          </Button>
        </div>
      </form>
    </div>
  );
}

export default SendMail;
