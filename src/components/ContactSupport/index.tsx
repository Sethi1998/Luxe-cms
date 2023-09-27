import { useContext, useEffect, useState } from "react";
import { Layout } from "../Layout";
import Container from "../common/Container";
import { apiHandler } from "@/helpers/api";
import { getSupport } from "@/helpers/api/constants";
import { CMSModal } from "@/context";

type Support = {
  title: string;
  description: string;
  email: string;
  _id: string;
};
export const ContactSupport = () => {
  const [supportData, setSupportData] = useState<Support[]>([]);
  const { loading, setLoading } = useContext(CMSModal);
  useEffect(() => {
    fetchSupport();
  }, []);
  const fetchSupport = async () => {
    setLoading(true);
    const res = await apiHandler(`${getSupport}`, "GET");
    if (res.data.success) {
      setSupportData(res.data.data);
      setLoading(false);
    }
  };
  return (
    <Layout>
      <Container>
        <h2 className="text-2xl font-bold">Contact Support Listing</h2>
        <table className="mt-6 flex flex-col gap-4 w-full ">
          <thead className="text-center ">
            <tr className="grid grid-cols-3 gap-6 border-b">
              <td>Title</td>
              <td>Email</td>
              <td>Message</td>
            </tr>
          </thead>

          <tbody className="flex flex-col gap-4 text-center border-b">
            {supportData.map((item) => (
              <tr key={item._id} className="grid grid-cols-3 gap-6 border-b">
                <td>{item.title}</td>
                <td>{item.email}</td>
                <td>{item.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Container>
    </Layout>
  );
};
