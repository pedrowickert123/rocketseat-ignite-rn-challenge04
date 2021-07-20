import React, { useState, useCallback, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";

import { SearchBar } from "../../components/SearchBar";
import { LoginDataItem } from "../../components/LoginDataItem";

import {
  Container,
  LoginList,
  EmptyListContainer,
  EmptyListMessage,
} from "./styles";
import { useStorageData } from "../../hooks/storageData";

interface LoginDataProps {
  id: string;
  title: string;
  email: string;
  password: string;
}

type LoginListDataProps = LoginDataProps[];

export function Home() {
  const [searchListData, setSearchListData] = useState<LoginListDataProps>([]);
  const [data, setData] = useState<LoginListDataProps>([]);

  const storage = useStorageData();

  async function loadData() {
    const key = "@passmanager:logins";

    const response = await storage.getItem(key);
    const data = response ? JSON.parse(response) : [];

    setSearchListData(data);
    setData(data);
  }

  useEffect(() => {
    loadData();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  function handleFilterLoginData(search: string) {
    if (search === "") {
      return setSearchListData(data);
    }

    if (!search) return;

    const filteredData: LoginListDataProps = data.filter(
      (item: LoginDataProps) => item.title.indexOf(search) !== -1
    );

    setSearchListData(filteredData);
  }

  return (
    <Container>
      <SearchBar
        placeholder="Pesquise pelo nome do serviço"
        onChangeText={(value) => handleFilterLoginData(value)}
      />

      <LoginList
        keyExtractor={(item) => item.id}
        data={searchListData}
        ListEmptyComponent={
          <EmptyListContainer>
            <EmptyListMessage>Nenhum item a ser mostrado</EmptyListMessage>
          </EmptyListContainer>
        }
        renderItem={({ item: loginData }) => {
          return (
            <LoginDataItem
              title={loginData.title}
              email={loginData.email}
              password={loginData.password}
            />
          );
        }}
      />
    </Container>
  );
}
