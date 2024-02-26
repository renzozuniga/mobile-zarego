import React, { useState, useEffect } from 'react';
import Axios from "axios";
import {
    FlatList,
    TouchableOpacity,
    View,
    Text,
    Pressable
} from 'react-native';
import { REACT_MOBILE_BACKEND_ZAREGO } from "@env";

const initialPage = `${REACT_MOBILE_BACKEND_ZAREGO}/api/countries/options`;

const CountryList = ({ navigation }: any) => {
    const [options, setOptions] = useState([]);
    const [selected, setSelected] = useState<number[]>([]);

    useEffect(() => {
        Axios.get(initialPage)
            .then((response: any) => {
                setOptions(response.data.data);
            });
    }, []);

    const onSelect = (id: any) => {
        setSelected((oldArray: any) => {
            if (oldArray.includes(id)) {
                return oldArray.filter((el: any) => el !== id);
            } else {
                return [...oldArray, id];
            }
        });
    }

    return (
        <View style={{ flex: 1 }}>
            <Text style={{ textAlign: 'center', margin: 20, fontWeight: 'bold', fontSize: 24 }}>CHOOSE COUNTRIES</Text>
            <View style={{ marginLeft: 20, marginRight: 20 }}>
                <FlatList
                    data={options}
                    renderItem={({ item, index }: any) => {
                        return (
                            <TouchableOpacity style={{
                                width: '100%',
                                height: 70,
                                borderColor: '#8e8e8e',
                                borderWidth: 0.2,
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: selected.includes(item.value) ? 'rgb(155 195 240)' : 'white'
                            }}
                                onPress={() => {
                                    onSelect(item.value);
                                }}>
                                <Text style={{ fontSize: 20 }}>{item.label}</Text>
                            </TouchableOpacity>
                        )
                    }}
                    style={{ height: '70%' }}
                />
            </View>
            <View style={{
                position: 'absolute',
                bottom: '5%',
                width: '60%',
                left: '20%',
                right: '20%',
                backgroundColor: 'white',
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1,
                borderColor: "black",
                borderRadius: 10,
            }}>
                <TouchableOpacity style={{
                    margin: 5,
                    backgroundColor: 'white',
                    borderRadius: 8,
                    height: 50,
                    width: '60%',
                    alignItems: 'center',
                    flexDirection: 'row'
                }} >
                    <View style={{ backgroundColor: 'white', height: 'auto', width: '100%' }}>
                        <Pressable style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingVertical: 12,
                            paddingHorizontal: 12,
                            borderRadius: 4,
                            elevation: 3,
                            backgroundColor: 'white',
                        }} onPress={() => navigation.navigate("CountryTable", { list: selected })}>
                            <Text style={{
                                fontSize: 20,
                                lineHeight: 21,
                                fontWeight: 'bold',
                                letterSpacing: 0.25,
                                color: 'black',
                            }}>See Data</Text>
                        </Pressable>
                    </View>
                </TouchableOpacity>
            </View>
        </View >
    );
};

export default CountryList;