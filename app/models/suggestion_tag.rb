# == Schema Information
#
# Table name: suggestion_tags
#
#  id          :integer          not null, primary key
#  tag_id      :integer          not null
#  order       :integer          default(1), not null
#  description :string           default(""), not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class SuggestionTag < ApplicationRecord
  belongs_to :tag, required: true

  validates :order, :description, presence: true
  validates :tag_id, uniqueness: true

  delegate :name, to: :tag, allow_nil: true

  def tag_attributes=(value)
    tag_name = (value || {})['name']
    self.tag = Tag.find_or_initialize_by(name: tag_name)
  end
end
