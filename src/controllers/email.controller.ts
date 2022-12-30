import { Request, Response, Router } from 'express';
import Controller from '../interfaces/controller.interface';
import { Guid } from 'guid-typescript';
import { Email } from '../models/email.model';
import { env } from 'node:process';
import { User } from '../models/user.model';
const sgMail = require('@sendgrid/mail')

class EmailController implements Controller {
    public path = '/emails';
    public router = Router();

    public getAllEmails = async (request: Request, response: Response) => {
        console.log("Get All Emails");
        
        // careful careful
        // await email.deleteMany({});
    
        let emails = await Email.find(
          {
            deleted_date: { $eq: null }
          }
        ).sort(
            { "created_date": -1 }
          );
    
        return response.status(200).send(emails);
    }

    public createEmail = async (request: Request, response: Response) => {
        const { 
            from,
            to,
            user_id,
            display_name,
            first_name,
            last_name
          } = request.body;

        let public_id = Guid.create();

        const email = new Email({ 
            from,
            to,
            user_id,
            display_name,
            first_name,
            last_name
          });

          this.sendEmail(from, to, user_id, display_name, first_name, last_name);
          
          // can we make this asynchronous
          await email.save();
          
          return response.status(201).send();

    }

    sendEmail = async (
        from: string,
        to: string,
        user_id: string,
        display_name: string,
        first_name: string,
        last_name: string
    ) => {

      let user = await User.findOne({ public_id: { $eq: user_id }});

      if (!user) return;

      user.invitation_sent_date = new Date();

      // save
      user.save();

      sgMail.setApiKey(process.env.SENDGRID_API_KEY)
      const msg = {
        to: to,
        subject: env.EMAIL_WELCOME_MESSAGE,
        from: env.EMAIL_WELCOME_MESSAGE_FROM,
        personalizations:[
          {
             "to":[
                 {
                   "email": to
                }
             ],
             "dynamic_template_data":{
                "display_name": display_name,
                "first_name": first_name,
                "last_name": last_name,
                "user_id": user_id
              }
          }
       ],
       "template_id": process.env.EMAIL_WELCOME_TEMPLATE_ID
      }
      sgMail
        .send(msg)
        .then((response: any) => {

          console.log(msg);
          console.log(response);
          console.log('Email sent')

        })
        .catch((error: any) => {
          console.error(error.response.body.errors)
        })
    }
}
export default EmailController;
