import MeetupDetail from "../../components/meetups/MeetupDetail";
import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";
import { Fragment } from "react";

function MeetupDetails(props) {
  return (
    <Fragment>
      <Head>
        <title>{props.newfoodData.title}</title>
        <meta name="description" content={props.newfoodData.description}></meta>
      </Head>
      <MeetupDetail
        image={props.newfoodData.image}
        title={props.newfoodData.title}
        address={props.newfoodData.address}
        description={props.newfoodData.description}
      ></MeetupDetail>
    </Fragment>
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://saw634703:saw249324@cluster0.mxakvhc.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const foodsCollection = db.collection("meetups");

  const meetups = await foodsCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    fallback: "blocking",
    paths: meetups.map((meetup) => ({
      params: { newfoodid: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  const newfoodid = context.params.newfoodid;

  const client = await MongoClient.connect(
    "mongodb+srv://saw634703:saw249324@cluster0.mxakvhc.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const foodsCollection = db.collection("meetups");

  const selectedMeetup = await foodsCollection.findOne({
    _id: new ObjectId(newfoodid),
  });

  client.close();

  return {
    props: {
      newfoodData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      },
    },
  };
}

export default MeetupDetails;
