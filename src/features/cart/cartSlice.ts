import type { PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "../../app/createAppSlice"

export type CartItem = {
  id: number
  name: string
  price: number
  quantity: number
  image: string
}

export type CartSliceState = {
  items: CartItem[]
  totalAmount: number
}

const initialState: CartSliceState = {
  items: [],
  totalAmount: 0,
}

export const cartSlice = createAppSlice({
  name: "cart",
  initialState,
  reducers: create => ({
    addToCart: create.reducer((state, action: PayloadAction<Omit<CartItem, "quantity">>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id)
      
      if (existingItem) {
        existingItem.quantity += 1
      } else {
        state.items.push({
          ...action.payload,
          quantity: 1,
        })
      }
      
      state.totalAmount = state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0,
      )
    }),
    
    removeFromCart: create.reducer((state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload)
      state.totalAmount = state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0,
      )
    }),
    
    updateQuantity: create.reducer(
      (state, action: PayloadAction<{ id: number; quantity: number }>) => {
        const item = state.items.find(item => item.id === action.payload.id)
        if (item) {
          if (action.payload.quantity <= 0) {
            state.items = state.items.filter(item => item.id !== action.payload.id)
          } else {
            item.quantity = action.payload.quantity
          }
          state.totalAmount = state.items.reduce(
            (total, item) => total + item.price * item.quantity,
            0,
          )
        }
      },
    ),
    
    clearCart: create.reducer(state => {
      state.items = []
      state.totalAmount = 0
    }),
  }),
})

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions
