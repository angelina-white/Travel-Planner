class UserMailer < ApplicationMailer

def welcome_email(user)
    @user = user
    mail(to: user.email, subject: "Welcome!")
end

def reset_password(user)
    @user = user
    @token = @user.signed_id(purpose: "password_reset", expires_in: 10.minutes)
    mail(to: user.email, subject: "Travel-Planner: username")
end

end
