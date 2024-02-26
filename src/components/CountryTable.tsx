import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Axios from "axios";
import { REACT_MOBILE_BACKEND_ZAREGO } from "@env";
import { Table, TableWrapper, Row } from 'react-native-table-component';

const initialPage = `${REACT_MOBILE_BACKEND_ZAREGO}/api/countries?page=1&rows=100`;

const borderColor = '#C1C0B9';
const primaryColor = 'black';

const CountryTable = ({ route }: any) => {
    const { list } = route.params
    const [data, setData] = useState([]);

    const leftRef = useRef<ScrollView>(null);
    const rightRef = useRef<ScrollView>(null);
    const [tableHead, setTableHead] = useState([]);
    const [widthArr, setWidthArr] = useState([50, 60, 80, 100, 120, 140, 160, 180, 200]);
    const [recData, setRecData] = useState<any>([]);
    const [tabData, setTabData] = useState<any>([]);

    const headerHeight = 40;
    const leftColumnWidth = 100;

    useEffect(() => {
        Axios.get(`${initialPage}&list=${list.toString()}`)
            .then((response: any) => {
                const result = response.data.data;
                setData(result);
                setTableHead(result.map((el: any) => el.country_name));
                setWidthArr(result.map(() => 100));

                const rowsHead = [
                    { label: 'Performance', value: 'performance_oriented' },
                    { label: 'Autocratic', value: 'autocratic' },
                    { label: 'Modesty', value: 'modesty' },
                    { label: 'Charisma', value: 'charisma' },
                    { label: 'Decisive', value: 'decisive' }];

                const recordData = [];
                for (let i = 0; i < rowsHead.length; i += 1) {
                    const rowData: any = [];
                    rowData.push(rowsHead[i].label);
                    recordData.push(rowData);
                }
                setRecData(recordData);

                const tableData = [];
                for (let i = 0; i < rowsHead.length; i += 1) {
                    const rowData = [];
                    for (let j = 0; j < result.length; j += 1) {
                        rowData.push(result[j][rowsHead[i].value]);
                    }
                    tableData.push(rowData);
                }
                setTabData(tableData);
            });

    }, []);

    return (
        <View
            style={{
                flex: 1,
                flexDirection: 'row',
                backgroundColor: '#eee',
                margin: 5
            }}
        >
            {/* Left Column */}
            <View
                style={{
                    width: leftColumnWidth,
                    backgroundColor: 'yellow',
                }}
            >
                {/* Blank Cell */}
                <View
                    style={{
                        height: headerHeight,
                        backgroundColor: primaryColor,
                        borderBottomWidth: 1,
                        borderBottomColor: borderColor,
                    }}
                ></View>
                {/* Left Container : scroll synced */}
                <ScrollView
                    ref={leftRef}
                    style={{
                        flex: 1,
                        backgroundColor: 'white',
                    }}
                    scrollEnabled={false}
                    showsVerticalScrollIndicator={false}
                >
                    <Table
                        borderStyle={{
                            borderWidth: 1,
                            borderColor,
                        }}
                    >
                        {recData.map((rowData: any, index: any) => (
                            <Row
                                key={index}
                                data={rowData}
                                height={headerHeight}
                                widthArr={[leftColumnWidth]}
                                style={styles.row}
                                textStyle={styles.textBold}
                            />
                        ))}
                    </Table>
                </ScrollView>
            </View>
            {/* Right Column */}
            <View
                style={{
                    flex: 1,
                    backgroundColor: 'white',
                }}
            >
                <ScrollView horizontal={true} bounces={false}>
                    <View>
                        <Table borderStyle={{ borderWidth: 1, borderColor }}>
                            <Row
                                data={tableHead}
                                widthArr={widthArr}
                                style={styles.head}
                                textStyle={{ ...styles.text, color: 'white' }}
                            />
                        </Table>
                        <ScrollView
                            ref={rightRef}
                            style={styles.dataWrapper}
                            scrollEventThrottle={16}
                            bounces={false}
                            onScroll={(e) => {
                                const { y } = e.nativeEvent.contentOffset;
                                leftRef.current?.scrollTo({ y, animated: false });
                            }}
                        >
                            <Table borderStyle={{ borderWidth: 1, borderColor }}>
                                {tabData.map((rowData: any, index: any) => (
                                    <Row
                                        key={index}
                                        data={rowData}
                                        height={headerHeight}
                                        widthArr={widthArr}
                                        style={styles.row}
                                        textStyle={styles.text}
                                    />
                                ))}
                            </Table>
                        </ScrollView>
                    </View>
                </ScrollView>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#eee' },
    head: { height: 40, backgroundColor: primaryColor },
    wrapper: { flexDirection: 'row' },
    title: { flex: 1, backgroundColor: '#f6f8fa' },
    row: { height: 'auto' },
    text: { textAlign: 'center' },
    textBold: { textAlign: 'center', fontWeight: 'bold' },
    dataWrapper: { marginTop: -1 },
});

export default CountryTable;