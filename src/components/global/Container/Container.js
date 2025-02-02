import React from 'react';
import {StyleSheet, StatusBar, KeyboardAvoidingView, Platform} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Container = ({
    keyboardVerticalOffset,
    backgroundColor = 'transparent', 
    barStyle, 
    customBarColor = backgroundColor,
    children, 
    edges = ["top"]
}) => {
    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} enabled={true} style={styles.container} keyboardVerticalOffset={keyboardVerticalOffset}>
            <SafeAreaView edges={edges} style={[styles.container, {backgroundColor: backgroundColor}]}>
                <StatusBar translucent barStyle={barStyle} backgroundColor={customBarColor}/>
                {children}
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
};

export default React.memo(Container);

export const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
