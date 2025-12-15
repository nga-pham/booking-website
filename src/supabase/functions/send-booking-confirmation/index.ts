// @ts-nocheck
// no check for this file as it runs in Deno environment where some types may not be available
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { chosenServiceProps, chosenInfoProps } from "../../../components/ui/Interfaces.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface BookingConfirmationRequest {
  partnerName: string;
  chosenServices: chosenServiceProps[];
  chosenDateTime: Date;
  chosenInfo: chosenInfoProps;
  totalCost: number;
  appUrl?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const {
      partnerName,
      chosenServices,
      chosenDateTime,
      chosenInfo,
      totalCost,
      appUrl,
    }: BookingConfirmationRequest = await req.json();

    console.log("Sending booking confirmation to:", chosenInfo.email);

    const servicesHTML = chosenServices
      .map(
        (service) =>
          `<li>${service.name} - $${service.cost} (${service.duration} min)</li>`
      )
      .join("");

    const addressHTML = chosenInfo.address
      ? `
      <p><strong>Service Address:</strong><br/>
      ${chosenInfo.address}<br/>
      ${chosenInfo.district}, ${chosenInfo.city}</p>
    `
      : "";

    // Using Resend's testing domain - works immediately, no verification needed
    // For production: Replace with "Booking <noreply@yourdomain.com>" after verifying your domain at resend.com/domains
    
    const bookingData = encodeURIComponent(JSON.stringify({
      partnerName,
      chosenServices,
      chosenDateTime,
      chosenInfo,
      totalCost,
      appUrl,
    }));
    
    // Use the provided appUrl or fallback to window.location.origin from the request
    const baseUrl = appUrl || 'https://wtuabgmhionouxltwbfl.lovableproject.com';
    const paymentUrl = `${baseUrl}/payment?data=${bookingData}`;

    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Booking Confirmation <onboarding@resend.dev>",
        to: [chosenInfo.email],
        subject: `Booking Confirmation - ${partnerName}`,
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Booking Confirmation</title>
            </head>
            <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f8f9fa;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8f9fa; padding: 40px 20px;">
                <tr>
                  <td align="center">
                    <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); overflow: hidden;">
                      <!-- Header -->
                      <tr>
                        <td style="background: linear-gradient(135deg, #00D9A5 0%, #00B88A 100%); padding: 40px 30px; text-align: center;">
                          <div style="width: 80px; height: 80px; background-color: #8bca84; border-radius: 50%; margin: 0 auto 20px; display: inline-block; line-height: 80px;">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: middle;">
                              <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                          </div>
                          <h1 style="color: #ffffff; margin: 0; font-size: 32px; font-weight: bold;">Booking Confirmed!</h1>
                        </td>
                      </tr>
                      
                      <!-- Greeting -->
                      <tr>
                        <td style="padding: 30px 30px 20px;">
                          <p style="font-size: 16px; color: #1a1a1a; margin: 0; line-height: 1.6;">
                            Hi <strong>${userName}</strong>,
                          </p>
                          <p style="font-size: 16px; color: #1a1a1a; margin: 15px 0 0; line-height: 1.6;">
                            Thank you for your booking! Your appointment has been successfully confirmed.
                          </p>
                        </td>
                      </tr>

                      <!-- Booking Details -->
                      <tr>
                        <td style="padding: 20px 30px;">
                          <div style="background-color: #f8f9fa; border-radius: 8px; padding: 25px; border-left: 4px solid #8bca84;">
                            <h2 style="color: #1a1a1a; margin: 0 0 20px; font-size: 20px; font-weight: 600;">Booking Details</h2>
                            
                            <table width="100%" cellpadding="0" cellspacing="0">
                              <tr>
                                <td style="padding: 8px 0; color: #6c757d; font-size: 14px; font-weight: 600; width: 140px;">Vendor:</td>
                                <td style="padding: 8px 0; color: #1a1a1a; font-size: 14px;">${partnerName}</td>
                              </tr>
                              <tr>
                                <td style="padding: 8px 0; color: #6c757d; font-size: 14px; font-weight: 600;">Date:</td>
                                <td style="padding: 8px 0; color: #1a1a1a; font-size: 14px;">${chosenDateTime}</td>
                              </tr>
                            </table>
                          </div>
                        </td>
                      </tr>

                      <!-- Services -->
                      <tr>
                        <td style="padding: 0 30px 20px;">
                          <h3 style="color: #1a1a1a; margin: 0 0 15px; font-size: 18px; font-weight: 600;">Selected Services</h3>
                          ${chosenServices.map(service => `
                            <div style="padding: 12px 0; border-bottom: 1px solid #e9ecef;">
                              <table width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                  <td>
                                    <div style="color: #1a1a1a; font-size: 15px; font-weight: 500;">${service.name}</div>
                                    <div style="color: #6c757d; font-size: 13px; margin-top: 4px;">${service.duration} minutes</div>
                                  </td>
                                  <td align="right">
                                    <div style="color: #1a1a1a; font-size: 15px; font-weight: 600;">₫${service.cost.toLocaleString('vi-VN')}</div>
                                  </td>
                                </tr>
                              </table>
                            </div>
                          `).join('')}
                          <div style="padding: 15px 0 0;">
                            <table width="100%" cellpadding="0" cellspacing="0">
                              <tr>
                                <td style="color: #1a1a1a; font-size: 18px; font-weight: 700;">Total</td>
                                <td align="right" style="color: #8bca84; font-size: 20px; font-weight: 700;">₫${totalCost.toLocaleString('vi-VN')}</td>
                              </tr>
                            </table>
                          </div>
                        </td>
                      </tr>

                      <!-- Customer Info -->
                      <tr>
                        <td style="padding: 20px 30px;">
                          <h3 style="color: #1a1a1a; margin: 0 0 15px; font-size: 18px; font-weight: 600;">Customer Information</h3>
                          <div style="background-color: #f8f9fa; border-radius: 8px; padding: 20px;">
                            <table width="100%" cellpadding="0" cellspacing="0">
                              <tr>
                                <td style="padding: 6px 0; color: #6c757d; font-size: 14px; font-weight: 600; width: 140px;">Phone:</td>
                                <td style="padding: 6px 0; color: #1a1a1a; font-size: 14px;">${chosenInfo.phoneNumber}</td>
                              </tr>
                              <tr>
                                <td style="padding: 6px 0; color: #6c757d; font-size: 14px; font-weight: 600;">Address:</td>
                                <td style="padding: 6px 0; color: #1a1a1a; font-size: 14px;">
                                  ${chosenInfo.address}<br>
                                  ${chosenInfo.district}, ${chosenInfo.city}
                                </td>
                              </tr>
                            </table>
                          </div>
                        </td>
                      </tr>

                      <!-- Payment Button -->
                      <tr>
                        <td style="padding: 30px 30px 40px; text-align: center;">
                          <a href="${paymentUrl}" style="display: inline-block; background: linear-gradient(135deg, #8bca84 0%, #7ab873 100%); color: #ffffff; text-decoration: none; padding: 16px 40px; border-radius: 8px; font-size: 16px; font-weight: 600; box-shadow: 0 4px 12px rgba(139, 202, 132, 0.3);">
                            Continue to Payment
                          </a>
                          <p style="margin: 20px 0 0; font-size: 14px; color: #6c757d;">
                            Complete your booking by paying the initial deposit (50% of total)
                          </p>
                        </td>
                      </tr>

                      <!-- Footer -->
                      <tr>
                        <td style="background-color: #f8f9fa; padding: 25px 30px; text-align: center; border-top: 1px solid #e9ecef;">
                          <p style="margin: 0; font-size: 13px; color: #6c757d; line-height: 1.6;">
                            If you have any questions about your booking, please don't hesitate to contact us.
                          </p>
                          <p style="margin: 15px 0 0; font-size: 12px; color: #adb5bd;">
                            This is an automated message. Please do not reply to this email.
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </body>
          </html>
        `,
      }),
    });

    const emailData = await emailResponse.json();

    console.log("Email sent successfully:", emailData);

    if (!emailResponse.ok) {
      throw new Error(`Resend API error: ${JSON.stringify(emailData)}`);
    }

    return new Response(JSON.stringify({ success: true, data: emailData }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-booking-confirmation function:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
