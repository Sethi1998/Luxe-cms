import { Categories } from "@/components/Categories";
import { Layout } from "@/components/Layout";
import { PrimaryButton } from "@/components/common/Button/PrimaryButton";
import Container from "@/components/common/Container";
import { apiHandler } from "@/helpers/api";
import { getCategories } from "@/helpers/api/constants";
import React, { useEffect, useState } from "react";

const CategoriesPage = () => {
  return <Categories />;
};

export default CategoriesPage;
