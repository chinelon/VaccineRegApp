import React, { useState } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { Button, Input, Text} from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';

/**
 * Type for props to be passed by App when mounting AddEntry
 */
type Props = {
    createEntry: Function,
    cancelCreateEntry: Function
}

/**
 * Type for state variable
 */
type IState = {
    txnDay: number | null;
    txnMonth: number | null;
    txnYear: number | null;
    date: Date;
    name: string;
    age: number;
    email: string;
    hospitalname: string;
    productname: string
}

const AddEntry: React.FC<Props> = ({ createEntry, cancelCreateEntry }) => {
    const date = new Date(); // for initializing all the dates.
    const [state, setState] = useState<IState>({
        txnDay: date.getDate(),
        txnMonth: date.getMonth(),
        txnYear: date.getFullYear(),
        date: new Date(),
        name: '',
        age: 0,
        email: '',
        hospitalname: '',
        productname: ''
    })

    const [showDatePicker, setShowDatePicker] = useState(Platform.OS === "ios" ? true : false);

    return (
        <View style={styles.container}>
            <Text h3 style={styles.inputContainerStyle}>Make new vaccination entry</Text>
            {/* Only show button below if the OS is not ios. IOS DateTimePicker is visible by default */}
            {Platform.OS !== "ios" && <Button style={styles.inputContainerStyle}
                title="Select Date"
                onPress={() => {
                    setShowDatePicker(true);
                }}
            />}
            {showDatePicker && <DateTimePicker
                style={styles.inputContainerStyle}
                value={state.date}
                mode={'date'}
                //is24Hour={true}
                display="default"
                onChange={(_event: any, selectedDate: any) => {
                    const date: Date = selectedDate as Date;
                    setState({
                        ...state,
                        date: selectedDate,
                        txnDay: date.getDate(),
                        txnMonth: date.getMonth(),
                        txnYear: date.getFullYear()
                    })
                    setShowDatePicker(Platform.OS === "ios" ? true : false);
                }}
            />}
             <Input
                label="Name"
                placeholder="Enter Name here..."
                multiline
                inputContainerStyle={styles.inputContainerStyle}
                leftIcon={{ type: 'font-awesome', name: 'comment' }}
                onChangeText={name => setState({ ...state, name })}
            />
            <Input
                label="Age"
                placeholder="Enter age here"
                keyboardType="numeric"
                inputContainerStyle={styles.inputContainerStyle}
                leftIcon={{ type: 'font-awesome', name: 'money' }}
                onChangeText={age => setState({ ...state, age: +age })}
            />
            <Input
                label="Email"
                placeholder="Enter email so verification can be sent..."
                multiline
                inputContainerStyle={styles.inputContainerStyle}
                leftIcon={{ type: 'font-awesome', name: 'comment' }}
                onChangeText={email => setState({ ...state, email })}
            />
            <Input
                label="Hospital Name"
                placeholder="Enter preferred hospital name here..."
                multiline
                inputContainerStyle={styles.inputContainerStyle}
                leftIcon={{ type: 'font-awesome', name: 'comment' }}
                onChangeText={hospitalname => setState({ ...state, hospitalname })}
            />
             <Input
                label="Product Name"
                placeholder="Enter preferred vaccine name here..."
                multiline
                inputContainerStyle={styles.inputContainerStyle}
                leftIcon={{ type: 'font-awesome', name: 'comment' }}
                onChangeText={productname => setState({ ...state, productname })}
            />
            

            <View style={{ flexDirection: 'row' }}>
                <Button style={[styles.inputContainerStyle, { paddingRight: 1 }]}
                    title="Submit"
                    onPress={() => {
                        //call create which will also make the form disappear
                        createEntry(state);
                    }}
                /><Button style={[styles.inputContainerStyle, { paddingLeft: 1 }]}
                    title="Cancel"
                    onPress={() => {
                        //call create which will also make the form disappear
                        cancelCreateEntry();
                    }}
                    buttonStyle={{ backgroundColor: 'orange' }}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fffff2',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        marginTop: 30
    },
    inputContainerStyle: {
        width: '100%',
        padding: 10,
        backgroundColor: '#fffff2'
    }
});

export default AddEntry;