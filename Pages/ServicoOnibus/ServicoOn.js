import React, { useState } from 'react';
import { Text, SafeAreaView, StyleSheet, View, Button, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import SelectDropdown from 'react-native-select-dropdown';
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
} from "firebase/firestore";
import Data from '../ServicoCarro/Data';
import Comentario from '../ServicoCarro/Comentario';

export const ServicoOn = () => {

  const firebaseApp = initializeApp({
    apiKey: "AIzaSyCxBKAUFGbxrphaR5h5T159G79H0mVLqSc",
    authDomain: "chave-roda-app-5d672.firebaseapp.com",
    projectId: "chave-roda-app-5d672",
    storageBucket: "chave-roda-app-5d672.appspot.com",
    messagingSenderId: "1070397014270",
    appId: "1:1070397014270:web:60b68158e682a51cede5af"
  });

  const db = getFirestore(firebaseApp);

  const oficinas = ["Oficina 1", "Oficina 2", "Oficina 3"]
  const [servicos, setServicos] = useState([])


  const options = [
    "Troca de óleo - R$ 600,00",
    "Alinhamento/balanceamento - R$ 200,00",
    "Troca de pneu - R$ 300,00",
    "Manutenção de embreagem - R$ 400,00"
  ]

  function pickServicos(selectedServico){

    if(servicos.includes(selectedServico)){
      setServicos(servicos.filter(servico => servico !== selectedServico))
      return;
    }

    setServicos(servicos=>servicos.concat(selectedServico))
  }

  const [serv, setServ] = useState("");
  const [horario, setHorario] = useState("");
  const [comentario, setComentario] = useState("");

  async function criarDado() {
    try {
      const user = await addDoc(collection(db, "agendamentos"), {
        serv,
        horario,
        comentario,
      });
      console.log("dados salvos com sucessos", user);
      alert('Agendado com sucesso! :)')
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

    return(
      <SafeAreaView style={styles.container}>
        <Text style={styles.titulo}>{"\n"}{"\n"}{"\n"}AGENDAMENTO</Text>
        <Text style={styles.txt}>{"\n"}Selecione a oficina:</Text>
        <SelectDropdown label="Selecione a Oficina"
            data={oficinas}
            onSelect={(selectedItem, index) => {
              console.log(selectedItem, index)
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem
            }}
            rowTextForSelection={(item, index) => {
              return item
            }}
          />
          <Text style={styles.txt}>Selecione o serviço:</Text>
          <View style={styles.options}>
            {
              options.map(option=>
                <View key={option} style={styles.servicos}>
              <TouchableOpacity style={styles.CheckBox} onPress={()=>pickServicos(option)}>
                { servicos.includes (option) && <Text style={styles.check}>✅</Text>}
              </TouchableOpacity>
              <Text
              value={serv}
              onChange={(e) => setServ(e.target.value)}
              style={styles.servicosName}>{option}</Text>
              </View>)
            }
          </View>
          <Data 
          value={horario}
          onPress={(e) => setHorario(e.target.value)}></Data>
          <Text></Text>
          <Comentario
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}></Comentario>
            <Button
              style={styles.button}
              title={'Agendar'}
              onPress={criarDado}
              containerStyle={{
                width: 200,
                marginHorizontal: 50,
                marginVertical: 10,
              }}
            />
      </SafeAreaView>
    )
}

export default ServicoOn;

const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: 'center',
      textAlign: 'center',
      paddingHorizontal: 10
  },
  txt: {
    fontSize: 18,
    fontWeight:'600',
  },
  titulo: {
    fontSize:20,
    fontWeight: 'bold',
  },
  options: {
    alignSelf: 'flex-start',
    marginLeft: 30,
  },
  servicos: {
    flexDirection:'row',
    marginVertical: 7,
  },
  CheckBox:{
    width:25,
    height: 25,
    borderWidth: 2,
    borderColor:'green',
    marginRight:5,
  },
  servicosName:{
    textTransform: 'capitalize',
    fontSize: 16,
  },
  check:{
    alignSelf:'center',
  },
});