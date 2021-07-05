import Multiple from "../components/multiple";
import Single from "../components/single";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Single />
      <br />
      <br />
      <Multiple />
    </div>
  );
}
