"use client"
export const sendEmailVerificatiomOTP = async ({email, otp} : {email: string, otp:string}) => {
    try {
        const response = await fetch('/api/send-email/send-verification-otp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, otp }),
        })

        console.log(response)

    } catch (error) {
        console.error(error)
    }
}