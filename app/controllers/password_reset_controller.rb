class PasswordResetController < ApplicationController
    skip_before_action :authorized, only: [:create, :edit]

    def create
        @user = User.find_by(email: params[:email])
        UserMailer.reset_password(@user).deliver_now
    end

    def edit
        @user = User.find_signed(params[:token], purpose: "password_reset")
        testing = @user.username
        render json: testing, status: :ok
        # render template: "edit.html.erb"
    end

end