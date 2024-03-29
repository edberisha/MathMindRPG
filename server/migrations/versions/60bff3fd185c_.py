"""empty message

Revision ID: 60bff3fd185c
Revises: 91a5869a27be
Create Date: 2023-12-17 18:50:38.315330

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '60bff3fd185c'
down_revision = '91a5869a27be'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('times',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('time_value', sa.DateTime(), nullable=True),
    sa.Column('created_at', sa.DateTime(), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=True),
    sa.Column('updated_at', sa.DateTime(), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('games',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('time_id', sa.Integer(), nullable=False),
    sa.Column('first_integer', sa.Integer(), nullable=True),
    sa.Column('second_integer', sa.Integer(), nullable=True),
    sa.Column('time_taken', sa.DateTime(), nullable=True),
    sa.Column('created_at', sa.DateTime(), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=True),
    sa.Column('updated_at', sa.DateTime(), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=True),
    sa.ForeignKeyConstraint(['time_id'], ['times.id'], name=op.f('fk_games_time_id_times')),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name=op.f('fk_games_user_id_users')),
    sa.PrimaryKeyConstraint('id')
    )
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('updated_at', sa.DateTime(), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=True))
        batch_op.drop_column('email')
        batch_op.drop_column('_password_hash')
        batch_op.drop_column('update_at')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('update_at', sa.DATETIME(), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=True))
        batch_op.add_column(sa.Column('_password_hash', sa.VARCHAR(), nullable=True))
        batch_op.add_column(sa.Column('email', sa.VARCHAR(), nullable=True))
        batch_op.drop_column('updated_at')

    op.drop_table('games')
    op.drop_table('times')
    # ### end Alembic commands ###
