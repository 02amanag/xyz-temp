import { createSlice } from '@reduxjs/toolkit';

interface UserProps {
    user: {
        name?: string
    }
}

// Başlangıç durumu (initial state)
const initialState = {
    name: '',
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setName: (state, action) => {
            console.log("Redux Test Consol Mesajı");
            // Redux Toolkit ile doğrudan state güncellemesi yapabilirsin
            state.name = action.payload;
        },
        clearName: (state) => {
            state.name = "";
        }
    },
});



// Action creator'ları ve reducer'ı dışa aktar
export const { setName, clearName } = userSlice.actions;

// Selector örneği
export const selectUserName = (state: UserProps) => state.user.name;

export default userSlice.reducer;
