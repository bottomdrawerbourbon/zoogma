package Site::Controller::Shows;
use Moose;
use namespace::autoclean;

BEGIN {extends 'Catalyst::Controller'; }

=head1 NAME

Site::Controller::Band - Catalyst Controller

=head1 DESCRIPTION

Catalyst Controller.

=head1 METHODS

=cut

=head2 index

=cut

sub index :Path :Args(0) {
    my ( $self, $c ) = @_;
    $c->stash->{current_view} = 'JSON';

}

sub json :Local {
    my ( $self, $c ) = @_;

    $c->stash->{current_view} = 'JSON';

    my $showsRs = $c->model('MyModel::TourDate')->search({}, { order_by => { -asc => 'date'} });
    my @shows;
    while( my $show = $showsRs->next ) {
        my $href = {};
        map { $href->{$_} = $show->$_ if $show->$_ } 
          qw(id venue city facebook_event_url tickets_url description venue_url 
             venue_address venue_phone ticket_adv_price ticket_dos_price 
             additional_band);
        if( $show->date ) {
            $href->{date}          = $show->date->strftime("%F %T");
            $href->{expanded_date} = $show->date->strftime("%a, %B %d, %Y");
            $href->{expanded_time} = $show->date->strftime("%l:%M%P");
        }
        push @shows, $href;
    }
    $c->stash->{data} = \@shows;
}


=head1 AUTHOR

Nicholas McCamey,,,

=head1 LICENSE

This library is free software. You can redistribute it and/or modify
it under the same terms as Perl itself.

=cut

__PACKAGE__->meta->make_immutable;

1;
