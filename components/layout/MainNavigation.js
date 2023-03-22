import classes from "./MainNavigation.module.css";
import Link from "next/link";

function MainNavigation() {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>React Foods</div>
      <nav>
        <ul>
          <li>
            <Link href="/">All Foods</Link>
          </li>
          <li>
            <Link href="/newfood">Add New Foods</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
