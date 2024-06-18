import { Button, Container, Gap, HeaderBack, ModalPickPhoto } from "components/global"
import { Nontification } from "helper"
import React, { useState } from "react"
import { InteractionManager, ScrollView, StyleSheet, View } from "react-native"
import { responsive } from "utils/index"
import { useFocusEffect } from "@react-navigation/native"

function EditProfile({ navigation }) {

    const [isLoading, setIsloading] = useState(false)

    useFocusEffect(
        React.useCallback(() => {
          const task = InteractionManager.runAfterInteractions(() => {

          });
      
          return () => task.cancel();
        }, [navigation])
    );

    return (
        <Container backgroundColor={'white'}>
            <View style={{paddingTop: responsive(16), paddingHorizontal: responsive(16)}}>
                <HeaderBack
                    tittle={'Edit Profil'}
                    onBack={() => navigation.goBack()}
                />
                <Gap marginBottom={responsive(16)}/>
            </View>
            <ScrollView>
                <View style={{paddingTop: responsive(42), paddingHorizontal: responsive(16), backgroundColor: 'white'}}>
                    
                </View>
            </ScrollView>
        </Container>
    )
}

export default EditProfile

const styles = StyleSheet.create({

})