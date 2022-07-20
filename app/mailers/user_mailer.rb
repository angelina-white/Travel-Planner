class UserMailer < ApplicationMailer

def welcome_email(user)
    @user = user
    mail(to: user.email, subject: "Welcome!")
end

def reset_password(user)
    @user = user
    mail(to: user.email, subject: "Travel-Planner: Reset password")
end

end
