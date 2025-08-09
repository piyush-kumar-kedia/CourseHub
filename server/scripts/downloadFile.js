const encodeGraphShareUrl = (shareUrl) => {
    let base64;
  
  if (typeof Buffer !== 'undefined') {
    // Node.js environment
    base64 = Buffer.from(shareUrl, "utf8").toString("base64");
  } else {
    // Browser environment
    base64 = btoa(shareUrl);
  }

  console.log(`u!${base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "")}`);
  
  return `u!${base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "")}`;
};

 const accessToken = "eyJ0eXAiOiJKV1QiLCJub25jZSI6ImNyWVQtYU8wS2EyOF9jTm9JcDZfdE1wcUY5Nk53QzJudnFNSi1vVmkyNE0iLCJhbGciOiJSUzI1NiIsIng1dCI6IkpZaEFjVFBNWl9MWDZEQmxPV1E3SG4wTmVYRSIsImtpZCI6IkpZaEFjVFBNWl9MWDZEQmxPV1E3SG4wTmVYRSJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTAwMDAtYzAwMC0wMDAwMDAwMDAwMDAiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC84NTBhYTc4ZC05NGUxLTRiYzYtOWNmMy04YzExYjUzMDcwMWMvIiwiaWF0IjoxNzU0NzI5NTgyLCJuYmYiOjE3NTQ3Mjk1ODIsImV4cCI6MTc1NDgxNjI4MiwiYWNjdCI6MCwiYWNyIjoiMSIsImFpbyI6IkFVUUF1LzhaQUFBQTQrYXc3RFpVNXJDcmRsOEE1UHRtSU5CUnNxOHRDZVAwdTdDQXJ1L0VUdXg4Sk9YeTFrSkhnb0ZHeGFSSkRyVXNSNmN5cXJEc21hY1M2OTJ0VmZXQWVnPT0iLCJhbXIiOlsicHdkIl0sImFwcF9kaXNwbGF5bmFtZSI6IkdyYXBoIEV4cGxvcmVyIiwiYXBwaWQiOiJkZThiYzhiNS1kOWY5LTQ4YjEtYThhZC1iNzQ4ZGE3MjUwNjQiLCJhcHBpZGFjciI6IjAiLCJmYW1pbHlfbmFtZSI6IjI0MDEyMzAwMiIsImdpdmVuX25hbWUiOiJBQkhJTkFWIFJBSSIsImlkdHlwIjoidXNlciIsImlwYWRkciI6IjE0LjEzOS4xOTYuMjE5IiwibmFtZSI6IkFCSElOQVYgUkFJIiwib2lkIjoiNGIyN2U3ODUtNzgzMS00ZTg0LTliNTMtYzAxNzdkMDE5NDA1IiwicGxhdGYiOiIzIiwicHVpZCI6IjEwMDMyMDAzQTc4OEFDNUMiLCJyaCI6IjEuQVNvQWphY0toZUdVeGt1Yzg0d1J0VEJ3SEFNQUFBQUFBQUFBd0FBQUFBQUFBQUFwQWNJcUFBLiIsInNjcCI6IkZpbGVzLlJlYWQgRmlsZXMuUmVhZC5BbGwgRmlsZXMuUmVhZFdyaXRlIEZpbGVzLlJlYWRXcml0ZS5BbGwgb3BlbmlkIHByb2ZpbGUgVXNlci5SZWFkIGVtYWlsIiwic2lkIjoiMDA3Yjc5NzktODI3NC1kNmNhLTlhZDYtNWE0ZjhmODc3Yzc1Iiwic3ViIjoidVVQa1p5LUdHdEltLXVCdktlNEc1aWRpckl5VENHNUNHU0VsSUtzZnpfUSIsInRlbmFudF9yZWdpb25fc2NvcGUiOiJBUyIsInRpZCI6Ijg1MGFhNzhkLTk0ZTEtNGJjNi05Y2YzLThjMTFiNTMwNzAxYyIsInVuaXF1ZV9uYW1lIjoiYWJoaW5hdi5yYWlAaWl0Zy5hYy5pbiIsInVwbiI6ImFiaGluYXYucmFpQGlpdGcuYWMuaW4iLCJ1dGkiOiJudkFPd2prejNraUVBc3B1OHZocUFBIiwidmVyIjoiMS4wIiwid2lkcyI6WyJiNzlmYmY0ZC0zZWY5LTQ2ODktODE0My03NmIxOTRlODU1MDkiXSwieG1zX2NjIjpbIkNQMSJdLCJ4bXNfZnRkIjoiVFRfdzJ2TDQyS29QeTBwY21SQU9KTkdmMkJ3aGd6ZG9oVUx4X05Ka1NXRUJhMjl5WldGalpXNTBjbUZzTFdSemJYTSIsInhtc19pZHJlbCI6IjEgMjgiLCJ4bXNfc3NtIjoiMSIsInhtc19zdCI6eyJzdWIiOiJmeWJSVjlnT29GejJRcmRRWmhHdWk1V1U0TFR6OUw1RzlIbmtocll1d2Q4In0sInhtc190Y2R0IjoxNTIzNTI2MDc3fQ.di6G3IllBu0ZE1N2vS-cXOvi9lNpW3oe2cmjOKD1gVEernIVKDBfN-KU74Jvz1c3bahiTvpu1IyADt0_xjDNFGcz8TP8fHvilrNmO-IWpCyQowVLXELhd5hgksHLYdvvouoCyzkYogekAnjMsMX_zYtxBQAdU8ZCo986gChfQTOkLZFJxF46cluaYnysV1Q_6wioc5PehRaw-qFtPk4iJeB9xemcwbjgN0hHmfriSCV2yBBKFdNNVe00OLbsKKQUhF19qXdwleRUPDYX68jMEOeoG5gYoOTCLqMNWSztbikWv-75MjyiXfZ7PXx2qEK5pW9e-0Xkahhjf5bUdlQCmQ" //Replace with your actual access token
export const downloadFiles = async (req, res) => {
  try {
    const inputUrl = req.body?.url;
    if (!inputUrl) {
      return res.status(400).json({ error: "Please provide a SharePoint/OneDrive share URL in request body as `url`." });
    }

    const encoded = encodeGraphShareUrl(inputUrl);
    console.log("Encoded URL:", encoded);

    // IMPORTANT: await the fetch so `response` is a Response object
    const response = await fetch(
      `https://graph.microsoft.com/v1.0/shares/${encoded}/driveItem`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    );

    // check for HTTP errors
    if (!response.ok) {
      const text = await response.text().catch(() => null);
      console.error("Graph API returned error:", response.status, response.statusText, text);
      return res.status(502).json({ error: "Failed to fetch from Microsoft Graph", status: response.status, detail: text });
    }

    // parse JSON (this works because the Graph endpoint returns JSON metadata)
    const data = await response.json();

    if (data.error) {
      console.error("Error object from Graph:", data.error);
      return res.status(502).json({ error: "Microsoft Graph responded with an error", detail: data.error });
    }

    const downloadLink = data["@microsoft.graph.downloadUrl"];
    if (!downloadLink) {
      console.error("No download link found in Graph response:", data);
      return res.status(500).json({ error: "No download link found in Graph response." });
    }

    // Return the direct download link (or you can proxy the file by fetching downloadLink)
    return res.status(200).json({ downloadLink });

  } catch (err) {
    console.error("Unexpected error in downloadFiles:", err);
    return res.status(500).json({ error: "Internal server error", detail: err?.message ?? err });
  }
};
