import classes from "./css/ErrorPage.module.css";

const ErrorPage = () => {
  return (
    <div className={classes.errorPage}>
      <h1 className={classes.header}>SomeThing Went Wrong!</h1>
    </div>
  );
};

export default ErrorPage;
