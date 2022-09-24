import { CommonActions } from "@react-navigation/native";

export const resetStack =(screenName,props)=>{
    props?.navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            { name: screenName },
          ],
        })
      );
}