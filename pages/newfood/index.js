import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import { useRouter } from "next/router";
import Head from "next/head";
import { Fragment } from "react";
function newFood() {
  const router = useRouter();

  async function addNewFood(enteredMeetupData) {
    const response = await fetch("/api/newfood", {
      method: "POST",
      body: JSON.stringify(enteredMeetupData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    console.log(data);

    router.push("/");
  }

  return (
    <Fragment>
      <Head>
        <title>Add Foods</title>
        <meta name="description" content="添加你喜歡的食物"></meta>
      </Head>
      <NewMeetupForm onAddMeetup={addNewFood}></NewMeetupForm>
    </Fragment>
  );
}

export default newFood;
