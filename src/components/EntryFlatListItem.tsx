import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ButtonGroup, Icon, Text, Button } from 'react-native-elements';
import { IVaccineEntry } from '../interfaces/vaccine-entry.interface';

type Props = {
    item: IVaccineEntry;
    deleteEntry: Function;
}

const EntryFlatListItem: React.FC<Props> = ({ item, deleteEntry }) => {

    return (
        <View style={styles.inputContainerStyle}>
            <Text style={{fontSize: 18}}>Date: {new Date(item.txnYear!, item.txnMonth!, item.txnDay!).toLocaleDateString()}</Text>
            <Text style={{fontSize: 18}}>Name: {item.name}</Text>
            <Text style={{fontSize: 18}}>Age: {item.age}</Text>
            <Text style={{fontSize: 18}}>Email: {item.email}</Text>
            <Text style={{fontSize: 18}}>Hospital Name: {item.hospitalname}</Text>
            <Text style={{fontSize: 18}}>Product Name: {item.productname}</Text>
            <ButtonGroup
                containerStyle={{ backgroundColor: 'skyblue', width: '40%', borderColor: 'skyblue' }}
                buttons={
                    [<Button
                        icon={<Icon
                            name="edit"
                            color="green"
                        />}
                        type="clear"
                        title="Edit"
                        titleStyle={{ fontSize: 15 }}
                        onPress={() => {}}
                    />,
                    <Button
                        icon={<Icon
                            name="delete"
                            color="red"
                        />}
                        type="clear"
                        title="Delete"
                        titleStyle={{ fontSize: 15 }}
                        onPress={() => {
                            deleteEntry(item.id!)
                        }}
                    />
                    ]
                }
            />
        </View>
    )
}

export default EntryFlatListItem;

const styles = StyleSheet.create({
    inputContainerStyle: {
        width: '100%',
        padding: 9
    }
});