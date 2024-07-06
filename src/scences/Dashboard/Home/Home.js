import { Feather, Ionicons } from "@expo/vector-icons"
import { useFocusEffect } from "@react-navigation/native"
import { Container, Gap } from "components/global"
import React, { useEffect, useState } from "react"
import { InteractionManager, RefreshControl, ScrollView, StyleSheet, View } from "react-native"
import { SCREEN_HEIGHT } from "react-native-normalize"
import { responsive } from "utils/index"

function Home({ navigation }) {

    const [isLoading, setIsLoading] = useState(false)

    useFocusEffect(
        React.useCallback(() => {
          const task = InteractionManager.runAfterInteractions(() => {
            
          });
      
          return () => task.cancel();
        }, [navigation])
    );

    useEffect(() => {
       
    }, [])

    const onRefresh = React.useCallback(() => {
        setIsLoading(true);
        
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
      }, []);

    return (
        <Container backgroundColor={'white'}>
             <Gap
                paddingHorizontal={responsive(16)}
                paddingTop={responsive(16)}
                marginBottom={responsive(16)}
            >

            </Gap>
            <ScrollView 
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
                }
                style={{
                    minHeight: SCREEN_HEIGHT,
                }}
            >
                <Gap>

                    <Gap marginBottom={responsive(296)}/>
                </Gap>
            </ScrollView>
        </Container>
    )
}

export default Home;

const styles = StyleSheet.create({

})