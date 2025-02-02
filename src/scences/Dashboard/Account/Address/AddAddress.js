import { Button, Container, Gap, HeaderBack, Input, Selection } from "components/global"
import ModalSelect from "components/global/Modal/ModalSelect"
import { useModal } from "context/modalContext"
import { Nontification } from "helper"
import { storage } from "helper/storage"
import { supabase } from "helper/supabase"
import React, { useState } from "react"
import { Alert, FlatList, Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native"
import apiRajaOngkir from "utils/ApiRajaOngkirUtils"
import { colors, justifyContent, radius, responsive, stylesFonts } from "utils/index"

function AddAddress({ navigation }) {

    const storageUser = storage.getMap("storageUser")

    const [input, setInput] = useState({
        province_id: null,
        city_id: null,
        name: null,
        address: null,
        receiver_name: null,
        receiver_phone: null
    })

    const [isLoading, setIsLoading] = useState(false)

    const handleAddAddress = async () => {
        setIsLoading(true)
        let params = {
            province_id: input.province_id?.id,
            province_name: input.province_id?.name,
            city_id: input.city_id?.id,
            city_name: input.city_id?.name,
            name: input.name,
            address: input.address,
            receiver_name: input.receiver_name,
            receiver_phone: input.receiver_phone,
            user_id: storageUser?.user_id
        }

        console.log(JSON.stringify(params));
        

        const { data, error } = await supabase
        .from('shipping_address')
        .insert([
            params
        ])
        .select()

        setIsLoading(false)

        if (error) {
            Nontification(error.message)
        }
        else {
            Nontification("Berhasil menambahkan data", [
                {
                    text: 'Ok',
                    onPress: () => {
                        navigation.goBack()
                    }
                }
            ])
        }
                
    }

    return (
        <Container backgroundColor={'white'}>
            <View style={{paddingTop: responsive(16), paddingHorizontal: responsive(16)}}>
                <HeaderBack
                    tittle={'Tambah Alamat'}
                    onBack={() => navigation.goBack()}
                />
            </View>
            <ScrollView>
                <View style={{paddingTop: responsive(42), paddingHorizontal: responsive(16)}}>
                    <Text style={stylesFonts.Body_1_Regular}>Silahkan buat alamat baru</Text>
                    <Gap marginBottom={responsive(16)}/>
                    <SectionForm
                        input={input}
                        setInput={setInput}
                    />
                    <Gap marginBottom={responsive(24)}/>
                    <Button
                        isLoading={isLoading}
                        tittle={'Simpan'}
                        onPress={() => {
                            if (!isLoading) {
                                handleAddAddress()
                            }
                        }}
                    />
                    <Gap marginBottom={responsive(194)}/>
                </View>
            </ScrollView>
        </Container>
    )
}

export default AddAddress

function SectionForm ({
    input,
    setInput
}) {

    let keyModal = {
        "modalProvince": "modalProvince",
        "modalKota": "modalKota"
    }

    const { showModal, hideModal } = useModal();
    
    const [isLoading, setIsLoading] = useState(false)

    const [listsProvince, setListsProvince] = useState([])

    const [listsCity, setListsCity] = useState([])

    const getProvince = async () => {
        showModal(keyModal.modalProvince)
        setIsLoading(true)

        let params = ``
        const res = await apiRajaOngkir.Province(params)

        setIsLoading(false)

        if (res?.code == 200) {
            setListsProvince(res?.value)
        }
        else {
            Nontification(res?.messages)
        }
    }

    const getKota = async () => {
        showModal(keyModal.modalKota)
        setIsLoading(true)

        let params = {
            id_provinsi: input?.province_id?.id
        }

        const res = await apiRajaOngkir.City(params)

        setIsLoading(false)

        if (res?.code == 200) {
            setListsCity(res?.value)
        }
        else {
            Nontification(res?.messages)
        }
    }

    return (
        <View>
            <Selection
                tittle={"Pilih Provinsi"}
                placeHolder={input?.province_id != null ? input?.province_id?.name : "Pilih Provinsi"}
                customTextColor={input?.province_id != null ? colors.black : colors.grey}
                onPress={() => {
                    if (listsProvince?.length > 0) {
                        showModal(keyModal.modalProvince)
                    }
                    else {
                        getProvince()
                    }
                }}
            />
            <ModalSelect
                modalId={keyModal.modalProvince}
                tittle="Pilih Provinsi"
                isLoading={isLoading}
                isConfirmation
                data={listsProvince}
                schemeData={{
                    id: 'id',
                    name: 'name'
                }}
                onConfirm={(item) => {
                    setInput({
                        ...input,
                        province_id: item
                    })
                }}
            />
            <Gap marginBottom={responsive(16)}/>
            <Selection
                tittle={"Pilih Kota"}
                placeHolder={input?.city_id != null ? input?.city_id?.name : "Pilih Kota"}
                customTextColor={input?.city_id != null ? colors.black : colors.grey}
                onPress={() => {
                    if (listsCity?.length > 0) {
                        showModal(keyModal.modalKota)
                    }
                    else {
                        getKota()
                    }
                }}
            />
            <ModalSelect
                modalId={keyModal.modalKota}
                tittle="Pilih Kota"
                isLoading={isLoading}
                isConfirmation
                data={listsCity}
                schemeData={{
                    id: 'id',
                    name: 'name'
                }}
                onConfirm={(item) => {
                    setInput({
                        ...input,
                        city_id: item
                    })
                }}
            />
            <Gap marginBottom={responsive(16)}/>
            <Input
                tittle={"Nama"}
                placeholder={"Nama"}
                value={input?.name}
                onChangeText={(val) => {
                    setInput({
                        ...input,
                        name: val
                    })
                }}
            />
            <Gap marginBottom={responsive(16)}/>
            <Input
                multiline
                customHeight={responsive(126)}
                customMarginTop={responsive(16)}
                tittle={"Alamat"}
                placeholder={"Alamat"}
                value={input?.address}
                onChangeText={(val) => {
                    setInput({
                        ...input,
                        address: val
                    })
                }}
            />
            <Gap marginBottom={responsive(16)}/>
            <Input
                tittle={"Nama Penerima"}
                placeholder={"Nama Penerima"}
                value={input?.receiver_name}
                onChangeText={(val) => {
                    setInput({
                        ...input,
                        receiver_name: val
                    })
                }}
            />
            <Gap marginBottom={responsive(16)}/>
            <Input
                tittle={"Nomor Penerima"}
                placeholder={"Nomor Penerima"}
                value={input?.receiver_phone}
                onChangeText={(val) => {
                    setInput({
                        ...input,
                        receiver_phone: val
                    })
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
})