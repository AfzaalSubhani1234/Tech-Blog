
from django.contrib.auth.models import User
from rest_framework import serializers


class RegisterSerializer(serializers.ModelSerializer):

    password = serializers.CharField(
        write_only=True,
        min_length=8
    )

    password2 = serializers.CharField(
        write_only=True
    )

    class Meta:
        model = User
        fields = [
            'id',
            'username',
            'email',
            'password',
            'password2',
        ]
        read_only_fields = ['id']

    def validate(self, data):
        password = data['password']

        # Check whether passwords match
        if password != data['password2']:
            raise serializers.ValidationError({
                'password2': 'Passwords do not match.'
            })

        # Check whether password contains at least one number
        if not any(char.isdigit() for char in password):
            raise serializers.ValidationError({
                'password': 'Password must contain at least one number.'
            })

        return data

    def create(self, validated_data):
        validated_data.pop('password2')

        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
        )

        return user