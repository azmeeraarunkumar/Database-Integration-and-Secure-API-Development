# config.py
import os
import logging

# Find the absolute path of the directory this file is in
basedir = os.path.abspath(os.path.dirname(__file__))
log_dir = os.path.join(basedir, 'logs')
os.makedirs(log_dir, exist_ok=True) # Create logs directory if it doesn't exist

class Config:
    """Base configuration settings."""
    SECRET_KEY = os.environ.get('SECRET_KEY')
    
    # --- Central Database Configuration ---
    DB_HOST = os.environ.get('DB_HOST')
    DB_USER = os.environ.get('DB_USER')
    DB_PASSWORD = os.environ.get('DB_PASSWORD')
    DB_NAME_CIMS = os.environ.get('DB_NAME_CIMS') or 'cs432cims'
    DB_NAME_PROJECT = os.environ.get('DB_NAME_PROJECT') or 'cs432g2'
    GROUP_ID = int(os.environ.get('GROUP_ID', 2)) 
    # --- Default Password for New Users ---
    DEFAULT_PASSWORD = os.environ.get('DEFAULT_PASSWORD')

    TEAM_MAX_PLAYERS = 12 
    TEAM_MIN_PLAYERS_FOR_MATCH = 6 
    
    # --- Logging Configuration ---
    LOGGING_FILENAME = os.path.join(log_dir, 'app.log')
    LOGGING_LEVEL = logging.INFO
    LOGGING_FORMAT = '%(asctime)s - %(name)s - %(levelname)s - %(message)s'

# Could add DevelopmentConfig, ProductionConfig classes inheriting from Config
# but for now, this base class is sufficient.
