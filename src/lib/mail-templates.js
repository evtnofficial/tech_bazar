export const forgotMailTemplate = (token) => {
	return `
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Reset Password</title>
</head>

<body>
  <h3>
    Welcome to ${process.env.COMPANY_NAME}
  </h3>
  <p>
    Click <a href="${process.env.DOMAIN_NAME}/newpassword?token=${token}">Reset Password</a> to Reset your password <br/> or <br/> copy and paste the link to into the browser <br/> ${process.env.DOMAIN_NAME}/newpassword?token=${token} </p> 
</body>

</html>`;
};

export const verifyMailTemplate = (token) => {
	return `
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Verify Email</title>
</head>

<body>
  <h3>
    Welcome to ${process.env.COMPANY_NAME}
  </h3>
  <p>
    Click <a href="${process.env.DOMAIN_NAME}/verifyemail?token=${token}">Verify Email</a> to verify your email <br/> or <br/> copy and paste the link to into the browser <br/> ${process.env.DOMAIN_NAME}/verifyemail?token=${token} </p> 
</body>

</html>`;
};
