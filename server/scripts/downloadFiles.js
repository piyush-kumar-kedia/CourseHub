const encodeGraphShareUrl = (shareUrl) => {
  // Step 1: Base64 encode
  let base64 = Buffer.from(shareUrl).toString('base64');

  // Step 2: Make it URL-safe
  let urlSafe = base64
    .replace(/\+/g, '-')  // + → -
    .replace(/\//g, '_')  // / → _
    .replace(/=+$/, '');  // remove any trailing '='

  return `u!${urlSafe}`;
};

 const accessToken = "eyJ0eXAiOiJKV1QiLCJub25jZSI6Im5mRmhfenVCWkNmNHBQbVVqVm5ubGRkdGM3cXhUMFNjTzEyMEI0SEktckUiLCJhbGciOiJSUzI1NiIsIng1dCI6IkpZaEFjVFBNWl9MWDZEQmxPV1E3SG4wTmVYRSIsImtpZCI6IkpZaEFjVFBNWl9MWDZEQmxPV1E3SG4wTmVYRSJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTAwMDAtYzAwMC0wMDAwMDAwMDAwMDAiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC84NTBhYTc4ZC05NGUxLTRiYzYtOWNmMy04YzExYjUzMDcwMWMvIiwiaWF0IjoxNzU0NDA3NjAzLCJuYmYiOjE3NTQ0MDc2MDMsImV4cCI6MTc1NDQ5NDMwNCwiYWNjdCI6MCwiYWNyIjoiMSIsImFjcnMiOlsicDEiXSwiYWlvIjoiQVdRQW0vOFpBQUFBa3c1Q05SSmVyRkVhdjBvYzV3WjVuNVBuNmxrY3JoemdVTkdEUmJKTGx3dWJIVTZLSHc4bWNycHJNZ1lXSC9ZbUFidTlack1XanFZKzQzSVZmQjl6WW9FSjVVdkpjRFhEdi9RNitFUUZFUzIwaXBpQU9rbE1DeVhZVmIrbWVmaFAiLCJhbXIiOlsicHdkIiwibWZhIl0sImFwcF9kaXNwbGF5bmFtZSI6IkdyYXBoIEV4cGxvcmVyIiwiYXBwaWQiOiJkZThiYzhiNS1kOWY5LTQ4YjEtYThhZC1iNzQ4ZGE3MjUwNjQiLCJhcHBpZGFjciI6IjAiLCJmYW1pbHlfbmFtZSI6IjI0MDEyMzAwMiIsImdpdmVuX25hbWUiOiJBQkhJTkFWIFJBSSIsImlkdHlwIjoidXNlciIsImlwYWRkciI6IjE0LjEzOS4xOTYuMjE5IiwibmFtZSI6IkFCSElOQVYgUkFJIiwib2lkIjoiNGIyN2U3ODUtNzgzMS00ZTg0LTliNTMtYzAxNzdkMDE5NDA1IiwicGxhdGYiOiIzIiwicHVpZCI6IjEwMDMyMDAzQTc4OEFDNUMiLCJyaCI6IjEuQVNvQWphY0toZUdVeGt1Yzg0d1J0VEJ3SEFNQUFBQUFBQUFBd0FBQUFBQUFBQUFwQWNJcUFBLiIsInNjcCI6IkZpbGVzLlJlYWQgRmlsZXMuUmVhZC5BbGwgRmlsZXMuUmVhZFdyaXRlIEZpbGVzLlJlYWRXcml0ZS5BbGwgb3BlbmlkIHByb2ZpbGUgVXNlci5SZWFkIGVtYWlsIiwic2lkIjoiMDA3YWRkMzktMmVmYy0zNDU4LThmMzctYWZkZTIyZWMxZTM4Iiwic3ViIjoidVVQa1p5LUdHdEltLXVCdktlNEc1aWRpckl5VENHNUNHU0VsSUtzZnpfUSIsInRlbmFudF9yZWdpb25fc2NvcGUiOiJBUyIsInRpZCI6Ijg1MGFhNzhkLTk0ZTEtNGJjNi05Y2YzLThjMTFiNTMwNzAxYyIsInVuaXF1ZV9uYW1lIjoiYWJoaW5hdi5yYWlAaWl0Zy5hYy5pbiIsInVwbiI6ImFiaGluYXYucmFpQGlpdGcuYWMuaW4iLCJ1dGkiOiJ4cmU2RlBBd1gwdVRzTnFHRHI1V0FBIiwidmVyIjoiMS4wIiwid2lkcyI6WyJiNzlmYmY0ZC0zZWY5LTQ2ODktODE0My03NmIxOTRlODU1MDkiXSwieG1zX2NjIjpbIkNQMSJdLCJ4bXNfZnRkIjoiQzRSSnU3d1Y1c0NENGZrSGdkenA4WFdIbGxySVc0UnBweGpGUkYwVlhQWUJZWE5wWVhOdmRYUm9aV0Z6ZEMxa2MyMXoiLCJ4bXNfaWRyZWwiOiIxMiAxIiwieG1zX3NzbSI6IjEiLCJ4bXNfc3QiOnsic3ViIjoiZnliUlY5Z09vRnoyUXJkUVpoR3VpNVdVNExUejlMNUc5SG5raHJZdXdkOCJ9LCJ4bXNfdGNkdCI6MTUyMzUyNjA3N30.jFXpXghzufDopNY8-sJ8AP9WO6qyXpi1tVzDZm5blP12U-cCR3-NwH1J66d1mHqCVN6SyTB0To1aEGghx3TBlNBCv5RECmnJkSWdGVYY6wrPHGHUUIHSFLuSRiFTZw6ELfbl-Perrqn4uzDwm4vlwCpvKEvzexq8tKvoofR_K8nvPcNQBwrYxxsykGzaMoDwCozL6NVdimyfEy0kjJEtSSbRmXe3B3lzXQu6NDehvkr2BNYCrw6Sr4HpZvU4CG7hLYDNQbHPoC5o_gH0Xyt6uRIp25YMeNUGRTCr5YhQhsw_ansUeFlvMmDpvGrXdycIfzfYcQgtiXukteDwqJFz7w";


export const downloadFiles = async (req,res) => {
    
    const inputUrl = req.body.url;
     if (inputUrl) {
        const encoded = encodeGraphShareUrl(inputUrl);
        setEncodedUrl(encoded);
        console.log("Encoded URL:", encoded);
    } else {
        console.error("Please enter a valid SharePoint URL.");
    }

const response = fetch(
  `https://graph.microsoft.com/v1.0/shares/${encodedUrl}/driveItem`,
  {
    method: 'GET', // optional, since GET is default
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

    const data = await response.json();
    if (data.error) {
        console.error("Error fetching data:", data.error);
        res.status(500).json({ error: "Failed to fetch data from Microsoft Graph." });
        return;
    }

    const downloadLink = data["@microsoft.graph.downloadUrl"];
    if (!downloadLink) {
        console.error("No download link found in the response.");
        res.status(500).json({ error: "No download link found." });
        return;
    }   
    
    res.status(200).json({ downloadLink });
    


}

