import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { ScrollView, TextInput, BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';
import RNPickerSelect from 'react-native-picker-select';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import api from '../../services/api';

import styles from './styles';

const TeacherList = () => {

    const [ isFiltersVisible, setIsFiltersVisible ] = useState(true);
    const [ subject, setSubject ] = useState('');
    const [ week_day, setWeekDay ] = useState('');
    const [ time, setTime ] = useState('');
    const [ teachers, setTeachers ] = useState([]);
    const [ favorites, setFavorites ] = useState<number[]>([]);

    function loadFavorites() {
        AsyncStorage.getItem('favorites').then(response => {
            if (response) {
                const favoritedTeachers = JSON.parse(response);
                const favoritedTeachersIds = favoritedTeachers.map((teacher: Teacher) => {
                    return teacher.id;
                });

                setFavorites(favoritedTeachersIds);
            }
        });
    }

    function handleToogleFiltersVisible() {
        setIsFiltersVisible(!isFiltersVisible);
    }

    async function handleFiltersSubmit() {

        loadFavorites();

        const response = await api.get('/classes', {
            params: {
                subject,
                week_day,
                time
            }
        });

        setIsFiltersVisible(false);
        setTeachers(response.data);
    }

    return (
        <View style={styles.container}>
            <PageHeader 
                title="Proffys disponíveis" 
                headerRight={(
                    <BorderlessButton onPress={handleToogleFiltersVisible}>
                        <Feather name="filter" size={20} color="#FFF" />
                    </BorderlessButton>
                )}
            >
                {isFiltersVisible && (
                    <View style={styles.searchForm}>
                        <Text style={styles.label}>Matéria</Text>
                        {/* <TextInput 
                            value={subject} 
                            onChangeText={text => setSubject(text)} 
                            style={styles.input} 
                            placeholder="Qual a matéria?"  
                            placeholderTextColor="#c1bccc" 
                        /> */}

                        {/* <DropDownPicker
                            items={[
                                { label: 'Ciências', value: 'Ciências' },
                                { label: 'Português', value: 'Português' },
                                { label: 'Matemática', value: 'Matemática' },
                                { label: 'Química', value: 'Química' },
                                { label: 'História', value: 'História' },
                                { label: 'Geografia', value: 'Geografia' },
                            ]}
                            defaultValue={subject}
                            containerStyle={{height: 54}}
                            style={{backgroundColor: '#fafafa'}}
                            itemStyle={{ justifyContent: 'flex-start' }}
                            dropDownStyle={{backgroundColor: '#fafafa'}}
                            onChangeItem={item => setSubject(item.value)}
                            placeholder="Qual a matéria?"
                        /> */}

                        <RNPickerSelect
                            onValueChange={(value) => setSubject(value)}
                            value={subject}
                            placeholder={{
                                label: 'Qual a matéria?',
                                value: ''
                            }}
                            style={{ inputIOS: styles.input, inputAndroid: styles.input }}
                            items={[
                                { label: 'Ciências', value: 'Ciências' },
                                { label: 'Português', value: 'Português' },
                                { label: 'Matemática', value: 'Matemática' },
                                { label: 'Química', value: 'Química' },
                                { label: 'História', value: 'História' },
                                { label: 'Geografia', value: 'Geografia' },
                            ]}
                        />
                        
                        <View style={styles.inputGroup}>

                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Dia da semana</Text>
                                {/* <TextInput 
                                    value={week_day} 
                                    onChangeText={text => setWeekDay(text)} 
                                    style={styles.input} 
                                    placeholder="Qual o dia?" 
                                    placeholderTextColor="#c1bccc" 
                                /> */}

                                <RNPickerSelect
                                    onValueChange={(value) => setWeekDay(value)}
                                    value={week_day}
                                    placeholder={{
                                        label: 'Qual o dia?',
                                        value: ''
                                    }}
                                    style={{ inputIOS: styles.input, inputAndroid: styles.input }}
                                    items={[
                                        { label: 'Domingo', value: '0' },
                                        { label: 'Segunda-feira', value: '1' },
                                        { label: 'Terça-feira', value: '2' },
                                        { label: 'Quarta-feira', value: '3' },
                                        { label: 'Quinta-feira', value: '4' },
                                        { label: 'Sexta-feira', value: '5' },
                                        { label: 'Sábado', value: '6' }
                                    ]}
                                />
                            </View>

                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Horário</Text>
                                <TextInput 
                                    value={time} 
                                    keyboardType={"numbers-and-punctuation"}
                                    onChangeText={text => setTime(text)} 
                                    style={styles.input} 
                                    placeholder="Qual o horário?" 
                                    placeholderTextColor="#c1bccc" 
                                />
                            </View>
                        </View>

                        <RectButton style={styles.submitButton} onPress={handleFiltersSubmit}>
                            <Text style={styles.submitButtonText}>Filtrar</Text>
                        </RectButton>
                    </View>
                )}
            </PageHeader>

            <ScrollView
                style={styles.teacherList}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 16
                }}
            >
                {teachers.map((teacher: Teacher) => {
                    return (
                        <TeacherItem 
                            key={teacher.id} 
                            teacher={teacher} 
                            favorited={favorites.includes(teacher.id)}
                        />
                    );
                })}
            </ScrollView>
        </View>
    );
}

export default TeacherList;