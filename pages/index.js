import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import Head from "next/head";
import { Fragment } from "react";
function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>Foods</title>
        <meta name="description" content="添加你喜歡的食物"></meta>
      </Head>
      ;<MeetupList meetups={props.food}></MeetupList>
    </Fragment>
  );
}
// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;

//   return {
//     props: { food: data },
//     revalidate: 10,
//   };
// }

export async function getStaticProps(req, res) {
  const data = req.body;

  const client = await MongoClient.connect(
    "mongodb+srv://saw634703:saw249324@cluster0.mxakvhc.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const foodsCollection = db.collection("meetups");

  const foods = await foodsCollection.find().toArray();

  client.close();
  return {
    props: {
      food: foods.map((food) => ({
        title: food.title,
        address: food.address,
        image: food.image,
        id: food._id.toString(),
      })),
    },
    revalidate: 10,
  };
}

export default HomePage;
