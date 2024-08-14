import { createTransport } from "nodemailer";
import __dirname from "../../../utils.js";
import variablesEnviroment from "../env/env.util.js";

const sendEmail = async (data) => {
  try {
    const transport = createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: variablesEnviroment.GOOGLE_EMAIL,
        pass: variablesEnviroment.GOOGLE_PASSWORD,
      },
    });
    await transport.verify();
    await transport.sendMail({
      from: `CODER STORE STORM <${variablesEnviroment.GOOGLE_EMAIL}>`,
      to: data.email,
      subject: `USER ${data.name.toUpperCase()} REGISTERED!`,
      html: `
      <h1>USER REGISTERED!<h1>
      <p>Code: ${data.code}</p>
      `,
    });
  } catch (error) {
    throw error;
  }
};

export default sendEmail;
