import crypto from "crypto";



const OTP_TTL = 5 * 60 * 1000;


type OTPRecord={
    otpHash:string,
    expiresAt:number
}

const otpStore = new Map<string,OTPRecord>();

function generateNumericOTP(length=6):string{
    if(length<=0)throw new Error("length must be >0");
    
    const digits = '0123456789';
    let otp = '';
    for (let i = 0; i < length; i++) {
        otp += digits[crypto.randomInt(0, 10)];
    }
    return otp;
}

function storeOTP(identifier: string, otp: string){
    const otpHash = hashOTP(otp);
    const expiresAt = Date.now() + OTP_TTL;

    otpStore.set(identifier,{otpHash,expiresAt});

}

function hashOTP(otp:string):string{
    return crypto.createHash("sha256").update(otp).digest("hex");
}


function verifyOTP(identifier: string, otp: string): boolean {
  const record = otpStore.get(identifier);
  if (!record) return false; 

  const { otpHash, expiresAt } = record;


  if (Date.now() > expiresAt) {
    otpStore.delete(identifier); 
    return false;
  }

  
  const inputHash = hashOTP(otp);
  const isMatch = crypto.timingSafeEqual(
    Buffer.from(inputHash, "hex"),
    Buffer.from(otpHash, "hex")
  );

  
  if (isMatch) otpStore.delete(identifier);

  return isMatch;
}


// Development log removed

export {generateNumericOTP,storeOTP,verifyOTP};
