# frozen_string_literal: true

class TrendTag
  include ActiveModel::Model
  TREND_TAGS_KEY = 'trend_tags'
  TREND_TAG_LIMIT = 3

  attr_accessor :name, :description, :tag_type

  def self.find_tags(limit = 3)
    suggestion_tags = SuggestionTag.order(:order).preload(:tag).limit(limit).map do |tag|
      new(name: tag.name, description: tag.description, tag_type: 'suggestion')
    end

    trend_ng_words = TrendNgWord.pluck(:word)

    # suggestion_tagsは運営側が設定するものなので、NGワードで除外しない
    (trend_tags.first(TREND_TAG_LIMIT).select { |trend_tag|
      trend_ng_words.none? { |ng_word| trend_tag.name.downcase.include?(ng_word) }
    } + suggestion_tags).uniq(&:name).first(limit)
  end

  def self.update_trend_tags(tag_names)
    Rails.cache.write(TREND_TAGS_KEY, tag_names)
  end

  # NOTE: 本来はdescriptionにトゥート件数を表示したいが、現状表示するほどトゥートがないので空を出している
  def self.trend_tags
    trend_tag_names = Rails.cache.read(TREND_TAGS_KEY) || []
    trend_tag_names.map { |tag_name| new(name: tag_name, description: '', tag_type: 'trend') }
  end
end
