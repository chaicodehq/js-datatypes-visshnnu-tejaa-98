/**
 * 📋 Jugaad Form Validator - Indian Style!
 *
 * India mein form bharna ek art hai! College admission ka form validate
 * karna hai. Har field ke apne rules hain. Tujhe ek errors object return
 * karna hai jisme galat fields ke error messages hain. Agar sab sahi hai
 * toh empty errors object aur isValid = true.
 *
 * formData object:
 *   { name, email, phone, age, pincode, state, agreeTerms }
 *
 * Validation Rules:
 *   1. name: must be a non-empty trimmed string, min 2 chars, max 50 chars
 *      Error: "Name must be 2-50 characters"
 *
 *   2. email: must be a string containing exactly one "@" and at least one "."
 *      after the "@". Use indexOf(), lastIndexOf(), includes().
 *      Error: "Invalid email format"
 *
 *   3. phone: must be a string of exactly 10 digits, starting with 6, 7, 8, or 9
 *      (Indian mobile numbers). Check each char is a digit.
 *      Error: "Invalid Indian phone number"
 *
 *   4. age: must be a number between 16 and 100 inclusive, and an integer.
 *      JUGAAD: Agar string mein number diya hai (e.g., "22"), toh parseInt()
 *      se convert karo. Agar convert nahi ho paya (isNaN), toh error.
 *      Error: "Age must be an integer between 16 and 100"
 *
 *   5. pincode: must be a string of exactly 6 digits, NOT starting with "0"
 *      Error: "Invalid Indian pincode"
 *
 *   6. state: Use optional chaining (?.) and nullish coalescing (??) -
 *      if state is null/undefined, treat as "". Must be a non-empty string.
 *      Error: "State is required"
 *
 *   7. agreeTerms: must be truthy (Boolean(agreeTerms) === true).
 *      Falsy values: 0, "", null, undefined, NaN, false
 *      Error: "Must agree to terms"
 *
 * Return:
 *   { isValid: boolean, errors: { fieldName: "error message", ... } }
 *   - isValid is true ONLY when errors object has zero keys
 *
 * Hint: Use typeof, Boolean(), parseInt(), isNaN(), Number.isInteger(),
 *   ?. (optional chaining), ?? (nullish coalescing), Object.keys(),
 *   startsWith(), trim(), length
 *
 * @param {object} formData - Form fields to validate
 * @returns {{ isValid: boolean, errors: object }}
 *
 * @example
 *   validateForm({
 *     name: "Rahul Sharma", email: "rahul@gmail.com", phone: "9876543210",
 *     age: 20, pincode: "400001", state: "Maharashtra", agreeTerms: true
 *   })
 *   // => { isValid: true, errors: {} }
 *
 *   validateForm({
 *     name: "", email: "bad-email", phone: "12345", age: 10,
 *     pincode: "0123", state: null, agreeTerms: false
 *   })
 *   // => { isValid: false, errors: { name: "...", email: "...", ... } }
 */
export function validateForm(formData) {
  // Your code here
  if(typeof formData !== "object") return null

  let errors = {}
  let isValid = false
  const {name, email, phone, age, pincode, state, agreeTerms} = formData

  const validateName = (name) =>{
    let isValid = false
    const error = "Name must be 2-50 characters"
    let trimmedName = name.trim()
    if(trimmedName.length >= 2 && trimmedName.length <=50){
      isValid = true
    }
    if(!isValid){
      errors["name"] = error
    }
  }

  const validateEmail = (email) =>{
    let isValid = false
    const error = "Invalid email format"

    if(typeof email === "string"){
      if(email.includes("@") && email.includes(".")){
        if(email.indexOf("@")){
          if(email.split("").filter(char => char === "@").length === 1){
            if(email.split("").filter(char=>char === "@" || char === ".").pop() === "."){
              isValid = true
            }
          }
        }
      }
    }
    if(!isValid){
      errors["email"] = error
    }
  }

  const validatePhone = (phone) =>{
    let isValid = false
    const error = "Invalid Indian phone number"
    if(phone.length === 10){
      if(/^[6-9]\d{9}$/.test(phone)){
        isValid = true
      }
    }
    if(!isValid){
      errors['phone'] = error
    }
  }

  const validateAge = (age) =>{
    let isValid = false
    const error = 'Age must be an integer between 16 and 100'
    if(Number(age) >= 16 && Number(age) <=100 && parseInt(age) == age){
      isValid = true
    }
    if(!isValid){
      errors["age"] = error
    }
  }

  const validatePinCode = (pin) =>{
    let isValid = false
    const error = "Invalid Indian pincode"
    if(pin.length === 6 && !pin.startsWith("0") && /^[1-9]\d{5}$/.test(pin)){
      isValid = true
    }
    if(!isValid){
      errors["pincode"] = error
    }
  }

  const validateState = (state) =>{
    let isValid = false;
    const error = "State is required"
    if(typeof state === "string" && state.trim().length > 0){
      isValid = true
    }
    if(!isValid){
      errors["state"] = error
    }
  }

  const validateAgreeTerms = (agreeTerms) =>{
    let isValid = false;
    const error = "Must agree to terms"
    const falsyValues = [0, "", null, undefined, NaN, false]
    if(!falsyValues.includes(agreeTerms)){
      isValid = true
    }

    if(!isValid){
      errors["agreeTerms"] = error
    }
  }

  
  validateName(name)
  validateEmail(email)
  validatePhone(phone)
  validateAge(age)
  validatePinCode(pincode)
  validateState(state)
  validateAgreeTerms(agreeTerms)
  
  if(Object.keys(errors).length === 0) isValid = true

  return {
    isValid,
    errors
  }
}
