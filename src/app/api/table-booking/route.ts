/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { format } from "date-fns";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      name: string;
      email: string;
      phone: string;
      guests: string;
      date: string;
      time: string;
      request: string;
    };
    const { name, email, phone, guests, date, time, request } = body;

    // Validate that the booking date is not in the past
    const bookingDate = new Date(date);
    const currentDate = new Date();

    // Set both dates to start of day for date comparison
    const bookingDateOnly = new Date(bookingDate);
    bookingDateOnly.setHours(0, 0, 0, 0);

    const currentDateOnly = new Date(currentDate);
    currentDateOnly.setHours(0, 0, 0, 0);

    // Check if booking date is in the past
    if (bookingDateOnly < currentDateOnly) {
      return NextResponse.json(
        {
          error:
            "Booking date cannot be in the past. Please select a valid date.",
        },
        { status: 400 },
      );
    }

    // Check if booking is for today but time is in the past
    if (bookingDateOnly.getTime() === currentDateOnly.getTime() && time) {
      const timeParts = time.split(":").map(Number);
      // Ensure we have valid hour and minute values
      if (timeParts.length >= 2) {
        const bookingHour = timeParts[0] ?? 0;
        const bookingMinute = timeParts[1] ?? 0;
        const currentHour = currentDate.getHours();
        const currentMinute = currentDate.getMinutes();

        // Convert to minutes for easier comparison
        const bookingTimeInMinutes = bookingHour * 60 + bookingMinute;
        const currentTimeInMinutes = currentHour * 60 + currentMinute;

        if (bookingTimeInMinutes <= currentTimeInMinutes) {
          return NextResponse.json(
            {
              error:
                "Cannot book a time that has already passed. Please select a future time.",
            },
            { status: 400 },
          );
        }

        // Check for 12-hour margin (720 minutes)
        if (bookingTimeInMinutes - currentTimeInMinutes < 60) {
          return NextResponse.json(
            {
              error:
                "Bookings must be made at least 1 hours in advance. Please select a later time or date.",
            },
            { status: 400 },
          );
        }
      }
    } else {
      // If booking for a future date, ensure there's at least 12 hours notice
      const bookingDateTime = new Date(bookingDate);
      const [bookingHour, bookingMinute] = time.split(":").map(Number);
      if (bookingHour !== undefined && bookingMinute !== undefined) {
        bookingDateTime.setHours(bookingHour, bookingMinute, 0, 0);

        const currentTimePlus12Hours = new Date(
          currentDate.getTime() + 1 * 60 * 60 * 1000,
        );

        if (bookingDateTime < currentTimePlus12Hours) {
          return NextResponse.json(
            {
              error:
                "All online bookings should be sent 1 hours before arrival time. Please select a time with adequate notice.",
            },
            { status: 400 },
          );
        }
      }
    }

    const smtpOptions = {
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    };

    const transporter = nodemailer.createTransport({
      ...smtpOptions,
    });

    const mailOptions = {
      from: `${process.env.EMAIL_FROM_PREFIX} Reservations <${process.env.EMAIL_USER}>`,
      to: process.env.RECIPIENT_EMAIL,
      cc: email,
      subject: `New Table Booking By ${name} on ${format(new Date(date), "dd-MM-yyyy")}`,
      html: `
      <h1>Table Reservation from ${name}</h1>
      <br/>
      <p><strong>Name:</strong> ${name}</p>
      <br/>
      <p><strong>Email:</strong> ${email}</p>
      <br/>
      <p><strong>Phone:</strong> ${phone}</p>
      <br/>
      <p><strong>Number of Guest(s):</strong> ${guests}</p>
      <br/>
      <p><strong>Booking Date:</strong> ${format(new Date(date), "dd-MM-yyyy")}</p>
      <br/>
      <p><strong>Booking Time:</strong> ${time}</p>
      <br/>
      <p><strong>Special Request:</strong> ${request || "None"}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Booking received successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Booking error:", error);
    return NextResponse.json(
      { error: "Failed to process booking" },
      { status: 500 },
    );
  }
}
