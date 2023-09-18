import React from "react";
import { Layout } from "../Layout";
import Container from "../common/Container";
import { Card } from "../Categories/Card";

const Home = () => {
  return (
    <Layout>
      <Container>
        <h2 className="text-2xl font-bold">Luxe Ride Dashboard</h2>
        <div className="mt-10 grid grid-cols-3 gap-10">
          <Card label="Total User" count={120} img="/img/group.png" />
          <Card label="Total Car Rental" count={120} img="/img/key.png" />
          <Card label="Total Active Ride" count={120} img="/img/vehicle.png" />
          <Card label="Total Close Ride" count={120} img="/img/history.png" />
        </div>
      </Container>
    </Layout>
  );
};

export default Home;
