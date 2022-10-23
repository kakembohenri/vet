import image from "./form.jpg";

const FormImg = () => {
  return (
    <img
      src={image}
      style={{
        position: "fixed",
        height: "100%",
        width: "100%",
        zIndex: "-1",
      }}
      alt='form'
    />
  );
};
export default FormImg;
